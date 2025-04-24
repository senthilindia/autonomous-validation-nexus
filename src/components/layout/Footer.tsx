
import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white h-14 flex items-center px-4 text-sm text-muted-foreground">
      <div className="container mx-auto flex justify-between items-center">
        <span>© 2025 Helix Digital Testing Platform</span>
        <div className="space-x-4">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Contact</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
