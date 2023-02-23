import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import LastUpdated from "@theme/LastUpdated";
import EditThisPage from "@theme/EditThisPage";
import { useWindowSize } from "@docusaurus/theme-common";
import TagsListInline from "@theme/TagsListInline";
import DocsRating from "../../../components/Feedback";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";
function TagsRow(props) {
    return (
        <div
            className={clsx(
                ThemeClassNames.docs.docFooterTagsRow,
                "row margin-bottom--sm"
            )}
        >
            <div className="col">
                <TagsListInline {...props} />
            </div>
        </div>
    );
}

function EditMetaRow({
    shouldRenderMobile,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    formattedLastUpdatedAt,
}) {
    const { colorMode, setColorMode } = useColorMode();
    return (
        <div
            style={{
                backgroundColor:
                    colorMode === "light"
                        ? "rgba(0,0,0,0.05)"
                        : "rgba(255,255,255,0.05)",
            }}
            className={clsx(
                !shouldRenderMobile ? styles.flex : null,
                styles.spaceBetween,
                styles.contentContainer
            )}
        >
            <div
                className={clsx(
                    ThemeClassNames.docs.docFooterEditMetaRow,
                    "row",
                    styles.flexColumn
                )}
            >
                <div className="col">
                    {editUrl && <EditThisPage editUrl={editUrl} />}
                </div>

                <div className={clsx("col", styles.lastUpdated)}>
                    {(lastUpdatedAt || lastUpdatedBy) && (
                        <LastUpdated
                            lastUpdatedAt={lastUpdatedAt}
                            formattedLastUpdatedAt={formattedLastUpdatedAt}
                            lastUpdatedBy={lastUpdatedBy}
                        />
                    )}
                </div>
            </div>
            <DocsRating label={"bottom"} />
        </div>
    );
}

export default function DocItemFooter(props) {
    const windowSize = useWindowSize();
    const shouldRenderMobile = windowSize === "mobile";
    const { metadata } = useDoc();
    const {
        editUrl,
        lastUpdatedAt,
        formattedLastUpdatedAt,
        lastUpdatedBy,
        tags,
        unversionedId,
    } = metadata;
    const canDisplayTagsRow = tags.length > 0;
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
    if (!canDisplayFooter) {
        return null;
    }

    return (
        <>
            <footer
                className={clsx(
                    ThemeClassNames.docs.docFooter,
                    "docusaurus-mt-lg"
                )}
            >
                {canDisplayTagsRow && <TagsRow tags={tags} />}
                {canDisplayEditMetaRow && (
                    <EditMetaRow
                        shouldRenderMobile={shouldRenderMobile}
                        editUrl={editUrl}
                        lastUpdatedAt={lastUpdatedAt}
                        lastUpdatedBy={lastUpdatedBy}
                        formattedLastUpdatedAt={formattedLastUpdatedAt}
                    />
                )}
            </footer>
        </>
    );
}
