import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import PrerequisitesList from '@site/src/components/PrerequisitesList';
import NextStepsList from '@site/src/components/NextStepsList';
import RelatedTopics from '@site/src/components/RelatedTopics';
import UsedTechnologies from '@site/src/components/UsedTechnologies';
import PracticalTasks from '@site/src/components/PracticalTasks';
import RequiredKnowledge from '@site/src/components/RequiredKnowledge';
import AppliedInTasks from '@site/src/components/AppliedInTasks';
import AlternativesList from '@site/src/components/AlternativesList';
import CitationBlock from '@site/src/components/CitationBlock';
import NextTasksList from '@site/src/components/NextTasksList';
import TypicalPitfalls from '@site/src/components/TypicalPitfalls';
import TrackNav from '@site/src/components/TrackNav';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props): ReactNode {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <TrackNav />
            <PrerequisitesList />
            <RequiredKnowledge />
            <DocItemContent>{children}</DocItemContent>
            <NextStepsList />
            {metadata.pluginId === 'tech' && (
              <>
                <AppliedInTasks />
                <AlternativesList />
                <CitationBlock />
              </>
            )}
            {metadata.pluginId === 'tasks' && (
              <>
                <NextTasksList />
                <TypicalPitfalls />
              </>
            )}
            {metadata.pluginId === 'default' && (
              <>
                <UsedTechnologies />
                <PracticalTasks />
              </>
            )}
            <RelatedTopics />
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
