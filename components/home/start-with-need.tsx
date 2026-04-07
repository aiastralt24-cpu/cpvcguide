import { CardLink } from "@/components/shared/card-link";
import { SectionHeading } from "@/components/shared/section-heading";

export function StartWithNeed({ items }: { items: { title: string; description: string; href: string }[] }) {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Start with your need"
        title="Use the task that matches the decision in front of you."
        description="Readers usually arrive with a practical job to do. These entry points get them to the right part of the cluster faster than taxonomy alone."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <CardLink key={item.href} href={item.href} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
}
