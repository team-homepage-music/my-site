"use client";

import { FormEvent, useState } from "react";

type VisitorLogEntry = {
  timestamp: string;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  userAgent?: string;
  referer?: string;
};

export default function VisitorsDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState<VisitorLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Array<{ key: keyof VisitorLogEntry; label: string }> = [
    { key: "timestamp", label: "Timestamp" },
    { key: "ip", label: "IP" },
    { key: "country", label: "Country" },
    { key: "region", label: "Region" },
    { key: "city", label: "City" },
    { key: "referer", label: "Referer" },
    { key: "userAgent", label: "User Agent" },
  ];

  const fetchLogs = async (secret: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/visitor/logs", {
        headers: {
          "x-dashboard-key": secret,
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? "Invalid password" : "Failed to load logs");
      }

      const data = (await response.json()) as { entries?: VisitorLogEntry[] };
      setLogs(Array.isArray(data.entries) ? data.entries : []);
      setIsAuthenticated(true);
    } catch (fetchError) {
      setIsAuthenticated(false);
      setLogs([]);
      setError(fetchError instanceof Error ? fetchError.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void fetchLogs(password);
  };

  const handleRefresh = () => {
    void fetchLogs(password);
  };

  const handleExport = () => {
    if (logs.length === 0) {
      return;
    }

    const header = columns.map((column) => column.label).join(",");
    const rows = logs.map((entry) =>
      columns
        .map((column) => {
          const value = entry[column.key] ?? "";
          const asString = typeof value === "string" ? value : "";
          const escaped = asString.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(","),
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `visitor-logs-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 px-6 py-16 text-zinc-100 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl space-y-10 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-purple-900/50 backdrop-blur-sm">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Visitor Insights</h1>
          <p className="text-sm text-white/70">
            Enter the dashboard password to review recent traffic details. Data includes the best-effort origin
            information collected from request headers.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-6">
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60" htmlFor="dashboard-password">
            Access Password
          </label>
          <input
            id="dashboard-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Enter password (configured via VISITOR_DASHBOARD_PASSWORD)"
            autoComplete="current-password"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              disabled={isLoading || password.length === 0}
            >
              {isAuthenticated ? "Unlock Again" : "Unlock Dashboard"}
            </button>
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                disabled={isLoading}
              >
                Refresh Logs
              </button>
            )}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleExport}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                disabled={logs.length === 0}
              >
                Export CSV
              </button>
            )}
            {isLoading && <span className="text-xs uppercase tracking-[0.3em] text-white/50">Loading...</span>}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>

        {isAuthenticated && (
          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Visitors</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Showing {logs.length} entr{logs.length === 1 ? "y" : "ies"}
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3">Time (UTC)</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Region</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Referrer</th>
                    <th className="px-4 py-3">User Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {logs.map((entry) => (
                    <tr key={`${entry.timestamp}-${entry.ip}`} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-mono text-xs text-white/80">
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          timeZone: "UTC",
                        })}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-white/80">{entry.ip}</td>
                      <td className="px-4 py-3 text-xs text-white/80">{entry.country ?? "unknown"}</td>
                      <td className="px-4 py-3 text-xs text-white/80">{entry.region ?? "unknown"}</td>
                      <td className="px-4 py-3 text-xs text-white/80">{entry.city ?? "unknown"}</td>
                      <td className="px-4 py-3 text-xs text-white/80">
                        {entry.referer && entry.referer !== "unknown" ? (
                          <a
                            href={entry.referer}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2"
                          >
                            {entry.referer}
                          </a>
                        ) : (
                          "unknown"
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-white/70">
                        {entry.userAgent && entry.userAgent !== "unknown" ? entry.userAgent : "unknown"}
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-white/60">
                        No visitor data recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
