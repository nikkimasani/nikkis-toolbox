// Combined Fever auth endpoint (keeps the deployment under the Hobby plan's
// 12-function limit). vercel.json rewrites /api/wtm-fever-register and
// /api/wtm-fever-token here, so their public URLs are unchanged.
const register = require('./_lib/wtm-fever-register.js');
const token = require('./_lib/wtm-fever-token.js');

module.exports = (req, res) => {
  const op = String((req.query && req.query.op) || '');
  if (op === 'register') return register(req, res);
  if (op === 'token') return token(req, res);
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(404).json({ error: 'Unknown Fever auth operation' });
};
