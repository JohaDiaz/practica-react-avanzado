import { useEffect, useState } from "react";
import { getTags } from "../service";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tags } from "../types";
import { Badge } from "@/components/ui/badge";

const tagsClassNames: Record<string, string> = {
  lifestyle:
    "border-chart-1 text-chart-1 data-[state=on]:bg-chart-1 border-2 bg-white data-[state=on]:text-white",
  mobile:
    "border-chart-2 text-chart-2 data-[state=on]:bg-chart-2 border-2 bg-white data-[state=on]:text-white",
  motor:
    "border-chart-3 text-chart-3 data-[state=on]:bg-chart-3 border-2 bg-white data-[state=on]:text-white",
  work: "border-chart-4 text-chart-4 data-[state=on]:bg-chart-4 border-2 bg-white data-[state=on]:text-white",
};

type TagsSelectorProps = {
  tags?: Tags;
  onChange: (tags: Tags) => void;
  className?: string;
};

  export default function TagsSelector({ onChange, className, tags: externalTags }: TagsSelectorProps) {
  const [tags, setTags] = useState<Tags | null>(externalTags ?? null);
  const [loading, setLoading] = useState(!externalTags);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadTags() {
      if (externalTags) {
        setTags(externalTags);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    loadTags();
  }, [externalTags]);

  if (error) {
    return <Badge className="bg-destructive h-9">No tags available</Badge>;
  }

  if (!tags || loading) {
    return <Skeleton className="h-9 w-[50%]" />;
  }

  return (
    <ToggleGroup
      type="multiple"
      defaultValue={[]}
      onValueChange={onChange}
      className={className}
    >
      {tags.map((tag) => (
        <ToggleGroupItem key={tag} value={tag} className={tagsClassNames[tag]}>
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
