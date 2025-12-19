import { defineStore } from "pinia";
import mockedApiData from "./mock-api-data.ts";

type AuditId = string;
type PageSlug = string;
type PageKey = `${AuditId}/${PageSlug}`;

interface Audit {
  name: string;
  pages: { name: string; slug: PageSlug }[];
}

interface Page {
  name: string;
  comment: string;
}

interface AuditsState {
  audits: Record<AuditId, Audit>;
  pages: Record<PageKey, Page>;
}

export const useAudits = defineStore("audits", {
  state: (): AuditsState => ({
    audits: {},
    pages: {},
  }),

  actions: {
    async fetchAudit(id: AuditId) {
      if (id in this.audits) {
        console.log(`Audit ${id} already fetched. Skipping fetch.`);
        return;
      }

      console.info("Fetching audit", id);
      // mocked network request
      const audit = await new Promise<Audit>((resolve, reject) => {
        setTimeout(
          () => {
            const audit = mockedApiData.find((a) => a.id === id);
            if (audit) {
              resolve({
                name: audit.name,
                pages: audit.pages.map((p) => ({ name: p.name, slug: p.slug })),
              });
            } else {
              reject(`Audit ${id} not found.`);
            }
          },
          200 + Math.random() * 300,
        );
      });
      this.audits[id] = audit;
    },

    async fetchPage(auditId: AuditId, slug: PageSlug) {
      const key: PageKey = `${auditId}/${slug}`;
      if (key in this.pages) {
        console.log(`Page ${key} already fetched. Skipping fetch.`);
        return;
      }

      console.info("Fetching page", key);
      // mocked network request
      const page = await new Promise<Page>((resolve, reject) => {
        setTimeout(
          () => {
            const audit = mockedApiData.find((a) => a.id === auditId);
            const page = audit?.pages.find((p) => p.slug === slug);
            if (page) {
              resolve({
                name: page.name,
                comment: page.comment,
              });
            } else {
              reject(`Page ${key} not found.`);
            }
          },
          200 + Math.random() * 300,
        );
      });

      this.pages[key] = page;
    },
  },
});
