const sessionId = require('crypto');

export function generateSessionId(){
    return sessionId.randomBytes(16).toString('hex');
}