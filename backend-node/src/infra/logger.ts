export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export function log(level: LogLevel, msg: string, fields?: Record<string, unknown>): void {
  const payload = {
    ts: new Date().toISOString(),
    level,
    msg,
    ...(fields ?? {}),
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
}
