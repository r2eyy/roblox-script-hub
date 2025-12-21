import { Heart, Code, Palette, Server, Shield, Sparkles } from "lucide-react";

const credits = [
  { title: "Developer", icon: Code, people: ["AlexOnR2", "Unknown"] },
  { title: "UI Designer", icon: Palette, people: ["AlexOnR2", "Anonymous Squad"] },
  { title: "API", icon: Server, people: ["Contributors", "AlexOnR2"] },
  { title: "Byfron Bypass", icon: Shield, people: ["DarkHotel Group", "AlexOnR2", "Anonymous Contributors"] },
];

export function CreditsPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"><Heart className="w-8 h-8 text-primary" /></div>
        <h1 className="text-3xl font-bold">Credits</h1>
        <p className="text-muted-foreground">Thanks to everyone who made R2Exec possible</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {credits.map((credit) => {
          const Icon = credit.icon;
          return (
            <div key={credit.title} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4"><div className="p-2.5 bg-primary/10 rounded-lg"><Icon className="w-5 h-5 text-primary" /></div><h3 className="font-semibold">{credit.title}</h3></div>
              <ul className="space-y-2">{credit.people.map((person, i) => <li key={i} className="text-sm text-muted-foreground flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{person}</li>)}</ul>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
        <h2 className="font-semibold mb-2">Special Thanks</h2>
        <p className="text-sm text-muted-foreground">To all our users and community members</p>
        <div className="flex items-center justify-center gap-2 mt-4 text-primary"><Heart className="w-4 h-4" /><span className="font-medium">Thank you!</span><Heart className="w-4 h-4" /></div>
      </div>

      <div className="text-center text-xs text-muted-foreground"><p>R2Exec v1.0.0</p><p className="mt-1">© 2024 R2Exec Team</p></div>
    </div>
  );
}