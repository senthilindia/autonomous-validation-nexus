
import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white h-14 flex items-center px-4 text-sm text-muted-foreground relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-white to-blue-50 opacity-50"></div>
      
      <div className="container mx-auto flex justify-between items-center z-10">
        <span>© 2025 Helix Digital Testing Platform</span>
        <div className="space-x-4">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200"></div>
    </footer>
  );
}
