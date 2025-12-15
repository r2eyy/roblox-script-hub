import { Heart, Code, Palette, Server, Shield } from "lucide-react";

const credits = [
  {
    title: "Developer",
    icon: Code,
    people: ["AlexOnR2", "Unknown"],
  },
  {
    title: "UI Designer",
    icon: Palette,
    people: ["AlexOnR2", "Anonymous Squad"],
  },
  {
    title: "API",
    icon: Server,
    people: ["People who helped with coding", "AlexOnR2"],
  },
  {
    title: "Roblox AntiCheat Bypass (Byfron)",
    icon: Shield,
    people: ["DarkHotel Group", "AlexOnR2", "Not-Wanting-To-Be-Mentioned Group (They don't want to be mentioned.)"],
  },
];

export function CreditsPage() {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto editor-scrollbar">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Credits</h1>
        <p className="text-muted-foreground">Thanks to everyone who made R2Exec possible</p>
      </div>

      {/* Credits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {credits.map((credit) => {
          const Icon = credit.icon;
          return (
            <div
              key={credit.title}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{credit.title}</h3>
              </div>
              <ul className="space-y-2">
                {credit.people.map((person, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {person}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Special Thanks */}
      <div className="bg-gradient-to-r from-primary/10 to-red-500/10 border border-primary/20 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">Special Thanks</h2>
        <p className="text-sm text-muted-foreground">
          To all our users and community members who continue to support R2Exec.
          Your feedback and support make this project possible.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Heart className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-primary font-medium">Thank you!</span>
          <Heart className="w-4 h-4 text-primary animate-pulse" />
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center text-xs text-muted-foreground">
        <p>R2Exec v1.0.0</p>
        <p className="mt-1">© 2024 R2Exec Team. All rights reserved.</p>
      </div>
    </div>
  );
}