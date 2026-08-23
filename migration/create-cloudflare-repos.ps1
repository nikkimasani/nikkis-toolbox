param(
  [string]$Owner = "nikkimasani"
)

$ErrorActionPreference = "Stop"

function Require-Command([string]$Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command '$Name' was not found."
  }
}

Require-Command "gh"
Require-Command "git"
& gh auth status | Out-Host
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated." }

$Mappings = @(
  @{ Source="nikkis-toolbox"; Target="nikkis-toolbox-cloudflare" },
  @{ Source="nikkis-tradehub"; Target="nikkis-tradehub-cloudflare" },
  @{ Source="reader-hub"; Target="reader-hub-cloudflare" },
  @{ Source="pmp-dashboard"; Target="pmp-dashboard-cloudflare" },
  @{ Source="betiq-sports-hub"; Target="betiq-sports-hub-cloudflare" },
  @{ Source="dabble"; Target="dabble-cloudflare" },
  @{ Source="pm-copilot"; Target="pm-copilot-cloudflare" },
  @{ Source="life-transition-command-center"; Target="life-transition-command-center-cloudflare" },
  @{ Source="career-arsenal"; Target="career-arsenal-cloudflare" },
  @{ Source="draw-your-font"; Target="draw-your-font-cloudflare" },
  @{ Source="sports-analytics-hub"; Target="sports-analytics-hub-cloudflare" },
  @{ Source="body-compass"; Target="body-compass-cloudflare" },
  @{ Source="make-it-pretty"; Target="make-it-pretty-cloudflare" },
  @{ Source="OCode-web"; Target="OCode-web-cloudflare" },
  @{ Source="pi-command-center"; Target="pi-command-center-cloudflare" },
  @{ Source="hobonichi-planner"; Target="hobonichi-planner-cloudflare" },
  @{ Source="wtm-whats-the-move"; Target="wtm-whats-the-move-cloudflare" }
)

$Root = Join-Path ([System.IO.Path]::GetTempPath()) "nikki-cloudflare-repo-copy"
if (Test-Path $Root) { Remove-Item $Root -Recurse -Force }
New-Item -ItemType Directory -Path $Root | Out-Null

foreach ($Map in $Mappings) {
  $SourceFull = "$Owner/$($Map.Source)"
  $TargetFull = "$Owner/$($Map.Target)"

  & gh repo view $TargetFull --json name *> $null
  if ($LASTEXITCODE -eq 0) {
    Write-Warning "$TargetFull already exists; leaving it untouched."
    continue
  }

  $Visibility = (& gh repo view $SourceFull --json visibility --jq '.visibility').Trim()
  if ($LASTEXITCODE -ne 0) { throw "Could not read $SourceFull." }
  $VisibilityFlag = if ($Visibility -eq "PRIVATE") { "--private" } else { "--public" }

  $Work = Join-Path $Root $Map.Target
  & git clone --quiet --single-branch --branch cloudflare-pages-prep "https://github.com/$SourceFull.git" $Work
  if ($LASTEXITCODE -ne 0) { throw "Could not clone $SourceFull cloudflare-pages-prep." }

  Push-Location $Work
  try {
    & git branch -M main
    & gh repo create $TargetFull $VisibilityFlag --description "Parallel Cloudflare-hosted copy of $($Map.Source). Original Vercel repo remains separate."
    if ($LASTEXITCODE -ne 0) { throw "Could not create $TargetFull." }
    & git remote set-url origin "https://github.com/$TargetFull.git"
    & git push --quiet -u origin main
    if ($LASTEXITCODE -ne 0) { throw "Could not push $TargetFull." }
    Write-Host "Created $TargetFull" -ForegroundColor Green
  }
  finally { Pop-Location }
}

# Nikki Project Manager had no GitHub source linked to its Vercel deployment.
# Its recovered Cloudflare source is stored inside the Cloudflare Toolbox staging branch.
$RecoveredTarget = "$Owner/nikki-project-manager-cloudflare"
& gh repo view $RecoveredTarget --json name *> $null
if ($LASTEXITCODE -eq 0) {
  Write-Warning "$RecoveredTarget already exists; leaving it untouched."
} else {
  $RecoverySource = Join-Path $PSScriptRoot "..\recovered\nikki-project-manager-cloudflare"
  if (-not (Test-Path $RecoverySource)) { throw "Recovered Project Manager source was not found at $RecoverySource." }
  $Work = Join-Path $Root "nikki-project-manager-cloudflare"
  New-Item -ItemType Directory -Path $Work | Out-Null
  Copy-Item (Join-Path $RecoverySource "*") $Work -Recurse -Force
  Push-Location $Work
  try {
    & git init --quiet
    & git checkout -b main
    & git add .
    & git -c user.name="Nikki Cloudflare Migration" -c user.email="88842480+nikkimasani@users.noreply.github.com" commit -m "Create recovered Cloudflare Project Manager"
    & gh repo create $RecoveredTarget --private --description "Recovered Cloudflare copy of Nikki Project Manager; original Vercel deployment remains separate."
    if ($LASTEXITCODE -ne 0) { throw "Could not create $RecoveredTarget." }
    & git remote add origin "https://github.com/$RecoveredTarget.git"
    & git push --quiet -u origin main
    if ($LASTEXITCODE -ne 0) { throw "Could not push $RecoveredTarget." }
    Write-Host "Created $RecoveredTarget" -ForegroundColor Green
  }
  finally { Pop-Location }
}

Write-Host "Cloudflare duplicate-repository creation finished. Existing target repos were never overwritten." -ForegroundColor Cyan
