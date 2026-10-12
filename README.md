# كلاسسىك كىنوخانا

A static Uyghur-language curation and playback guide for 20th-century classics. The curated catalog lives in `app.js`; movie metadata, posters, video files, and available subtitle files are requested directly from Internet Archive. No API key or server-side function is required. Serve the folder over HTTP(S) for service-worker and media behavior; a static host is enough.

## Curating films

Each `MOVIES` entry has a stable Archive `archiveId`, an approximate runtime for filtering, a Uyghur synopsis and recommendation, and one or more collection IDs. The details view reads the item's public metadata and selects a browser-playable MP4, WebM, or Ogg file. It only enables the subtitle control when an SRT/VTT file is present.

To add 1-2 weekly selections, add their metadata to `MOVIES`, assign the current `addedOn` date (`YYYY-MM-DD`), and add their IDs to an existing or new `COLLECTIONS` entry. The homepage shows entries added within the last seven days. The weekly topic rotates automatically; historical premiere dates use the `premiere` field (`MM-DD`). Verify the Archive identifier, runtime/version, subtitle availability, and rights for the exact uploaded file before publishing.

Internet Archive hosting does not itself establish that a particular copy is public domain. Copyright terms vary by work and jurisdiction; rights notices are shown when available, and uncertain entries should not be described as cleared for every viewer. The local vote is only a per-browser interaction, not a shared community poll.

Favorites, watchlist, playback position, reviews, ratings, and poll choices are stored in browser `localStorage`. See `privacy.html` for the data and third-party request notice.