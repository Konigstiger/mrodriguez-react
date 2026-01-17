import { useEffect } from "react";

type MetadataOptions = {
  title?: string;
  description?: string;
};

export function useMetadata({ title, description }: MetadataOptions) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description !== undefined) {
      let meta = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }

      meta.content = description;
    }
  }, [title, description]);
}
