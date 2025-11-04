"use client";

export function FlameBackground() {
  return (
    <div className="flame-background" aria-hidden="true">
      <div className="flame-layer flame-layer--base" />
      <div className="flame-layer flame-layer--mid" />
      <div className="flame-layer flame-layer--top" />
      <div className="flame-embers" />
    </div>
  );
}
