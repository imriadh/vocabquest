"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  RefreshCw,
  UserCog,
  Search,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminData {
  users: AdminUser[];
  total: number;
  admins: number;
  active: number;
  disabled: number;
}

export function AdminView() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [acting, setActing] = useState<string | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const d = (await res.json()) as AdminData;
      setData(d);
    } catch {
      toast({ title: "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(id: string, action: "disable" | "enable" | "promote" | "demote" | "delete") {
    setActing(`${id}:${action}`);
    try {
      let res: Response;
      if (action === "delete") {
        res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      } else {
        res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, action }),
        });
      }
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Action failed", description: data?.error, variant: "destructive" });
      } else {
        toast({ title: "Done", description: `User ${action}d`.replace("eed", "ed") });
        await load();
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setActing(null);
    }
  }

  const filtered = (data?.users ?? []).filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      u.email.toLowerCase().includes(q) ||
      (u.name?.toLowerCase().includes(q) ?? false) ||
      u.role.toLowerCase().includes(q)
    );
  });

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center gap-2 p-10 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Loading users…</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Users} label="Total users" value={data.total} tint="bg-sky-500/10 text-sky-600" />
        <Stat icon={ShieldCheck} label="Active" value={data.active} tint="bg-emerald-500/10 text-emerald-600" />
        <Stat icon={ShieldAlert} label="Disabled" value={data.disabled} tint="bg-amber-500/10 text-amber-600" />
        <Stat icon={UserCog} label="Admins" value={data.admins} tint="bg-violet-500/10 text-violet-600" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <UserCog className="h-4 w-4" /> User accounts
            </span>
            <Button variant="ghost" size="sm" onClick={load} className="gap-1">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by email, name, or role…"
              className="pl-9"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No users found.</p>
          ) : (
            <div className="scrollbar-thin max-h-[55vh] overflow-y-auto">
              <ul className="divide-y">
                {filtered.map((u) => (
                  <li key={u.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate font-medium">{u.email}</span>
                        {u.role === "ADMIN" && (
                          <Badge variant="secondary" className="bg-violet-500/15 text-violet-700">
                            Admin
                          </Badge>
                        )}
                        {u.disabled && (
                          <Badge variant="secondary" className="bg-rose-500/15 text-rose-700">
                            Disabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {u.name ? `${u.name} · ` : ""}
                        Joined {new Date(u.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {u.role === "ADMIN" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={acting === `${u.id}:demote`}
                          onClick={() => act(u.id, "demote")}
                        >
                          {acting === `${u.id}:demote"}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Demote"}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={acting === `${u.id}:promote`}
                          onClick={() => act(u.id, "promote")}
                        >
                          Promote
                        </Button>
                      )}
                      {u.disabled ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600"
                          disabled={acting === `${u.id}:enable`}
                          onClick={() => act(u.id, "enable")}
                        >
                          Enable
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-600"
                          disabled={acting === `${u.id}:disable`}
                          onClick={() => act(u.id, "disable")}
                        >
                          Disable
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        disabled={acting === `${u.id}:delete`}
                        onClick={() => {
                          if (confirm(`Delete user ${u.email}? This cannot be undone.`)) {
                            act(u.id, "delete");
                          }
                        }}
                        aria-label={`Delete ${u.email}`}
                      >
                        {acting === `${u.id}:delete"}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tint: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className={cn("rounded-md p-1", tint)}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}
