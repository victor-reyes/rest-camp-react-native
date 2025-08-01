export default function ColorTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Color Variable Test</h1>

      {/* Test using Tailwind classes */}
      <div className="bg-card text-card-foreground p-4 rounded">
        This should use --color-card (green)
      </div>

      <div className="bg-primary text-primary-foreground p-4 rounded">
        This should use --color-primary (blue)
      </div>

      <div className="bg-accent text-accent-foreground p-4 rounded">
        This should use --color-accent (yellow)
      </div>

      {/* Test using CSS variables directly */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-card-foreground)',
        }}
        className="p-4 rounded"
      >
        This uses CSS variables directly - should be green
      </div>

      {/* Test using HSL directly */}
      <div
        style={{ backgroundColor: 'hsl(110, 47%, 52%)', color: 'white' }}
        className="p-4 rounded"
      >
        This uses HSL directly - should be green
      </div>
    </div>
  );
}
