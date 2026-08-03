# External writing records

Each Markdown file in `external/` represents an article published on another site. It stores metadata and a canonical outbound link; it does not copy the original body.

- Preserve the original `publishedAt` and `updatedAt` values.
- Set `importedAt` to the date the record is added here.
- Use an HTTPS canonical `externalUrl`.
- Keep summaries factual and short.
- Run `npm run check:links` after adding or editing a record.
