"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "Business", href: "#business" },
    { name: "Pricing", href: "#pricing" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Support", href: "/contact" },
    { name: "API Documentation", href: "#" },
  ],
};

/**
 * SmallPrintAI Footer: brand, Product/Company/Support links, social placeholders, copyright.
 */
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-slate-900"
            >
              SmallPrint AI
            </Link>
            <p className="mt-4 text-slate-500 max-w-xs leading-relaxed">
              Empowering professionals with AI-driven legal clarity. We make the
              fine print accessible to everyone.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-slate-900 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-emerald-600 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs italic">
            © 2026 SmallPrint AI. Making the fine print legible since 2026.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Mail className="h-3 w-3" aria-hidden />
            hello@smallprint.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
