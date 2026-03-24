const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-sm">
          <span className="text-gradient-gold font-semibold">Sonitech</span>
          {/* <span className="text-muted-foreground ml-1">Australia</span> */}
        </div>
        
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground font-body">
          <a href="tel:+61435353200" className="hover:text-gold transition-colors block">
            +61 435 353 200
          </a>
          <a href="https://maps.google.com/?q=78A+Merola+Way,+Campbellfield+VIC+3061" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors block text-center">
            78A Merola Way, Campbellfield VIC 3061
          </a>
        </div>

        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Sonitech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
