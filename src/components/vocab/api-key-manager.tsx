"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeyRound, Trash2, Plus, Loader2, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface StoredKey {
  id: string;
  provider: string;
  label: string | null;
  keyHint: string;
  updatedAt: string;
}

const PROVIDERS = [
  { id: "openai", label: "OpenAI", note: "gpt-4o-mini. Get a key at platform.openai.com/api-keys" },
  { id: "gemini", label: "Google Gemini", note: "gemini-1.5-flash. Get a key at aistudio.google.com/apikey" },
  { id: "grok", label: "xAI Grok", note: "grok-beta. Get a key at console.x.ai" },
  { id: "openai-compatible", label: "OpenAI-compatible (DeepSeek, Mistral, Together, OpenRouter…)", note: "Any OpenAI-style chat completions API. Set a custom Base URL." },
];

export function ApiKeyManager() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<StoredKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("openai");
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [base, setBase] = useState("");
  const [model, setModel] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/api-keys", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { keys: StoredKey[] };
      setKeys(data.keys);
    } catch {
      toast({ title: "Failed to load keys", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function save() {
    if (!key.trim()) {
      toast({ title: "Enter an API key", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, key, label: label || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Save failed", description: data?.error, variant: "destructive" });
      } else {
        toast({ title: "API key saved", description: `Provider: ${provider}` });
        setKey("");
        setLabel("");
        await load();
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function remove(p: string) {
    if (!confirm(`Remove the ${p} API key?`)) return;
    try {
      await fetch(`/api/user/api-keys?provider=${encodeURIComponent(p)}`, { method: "DELETE" });
      toast({ title: "Key removed" });
      await load();
    } catch {
      toast({ title: "Remove failed", variant: "destructive" });
    }
  }

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <KeyRound className="h-4 w-4" /> API keys
          {keys.length > 0 && (
            <Badge variant="secondary" className="ml-1 tabular-nums">{keys.length}</Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" /> Your AI API keys
          </DialogTitle>
          <DialogDescription>
            Bring your own key for AI feedback. Keys are encrypted and stored on the server — never exposed to the browser. Use any of OpenAI, Gemini, Grok, or an OpenAI-compatible provider.
          </DialogDescription>
        </DialogHeader>

        {/* Stored keys */}
        <div className="space-y-2">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : keys.length === 0 ? (
            <p className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
              No keys stored yet. Add one below to enable AI writing feedback.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {keys.map((k) => (
                <li key={k.id} className="flex items-center justify-between gap-2 rounded-md border p-2 text-sm">
                  <div className="min-w-0">
                    <span className="font-medium capitalize">{k.provider}</span>
                    {k.label && <span className="text-muted-foreground"> · {k.label}</span>}
                    <span className="ml-2 text-xs text-muted-foreground">····{k.keyHint}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(k.provider)} aria-label={`Remove ${k.provider} key`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add / replace */}
        <div className="space-y-3 border-t pt-3">
          <div className="space-y-1.5">
            <Label htmlFor="ak-provider">Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger id="ak-provider"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {PROVIDERS.find((p) => p.id === provider)?.note}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ak-key">API key</Label>
            <Input id="ak-key" type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk-…" autoComplete="off" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="ak-label">Label (optional)</Label>
              <Input id="ak-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Personal OpenAI" />
            </div>
            {provider === "openai-compatible" && (
              <div className="space-y-1.5">
                <Label htmlFor="ak-base">Base URL (for openai-compatible)</Label>
                <Input id="ak-base" value={base} onChange={(e) => setBase(e.target.value)} placeholder="https://api.deepseek.com/v1/chat/completions" />
              </div>
            )}
          </div>
          {provider === "openai-compatible" && (
            <div className="space-y-1.5">
              <Label htmlFor="ak-model">Model name (for openai-compatible)</Label>
              <Input id="ak-model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. deepseek-chat" />
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Encrypted at rest
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={save} disabled={saving} className="gap-1.5">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Save key
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Re-export the base/model state setter helper for the practice view.
export function useProviderDefaults() {
  return { base: "", model: "" };
}
