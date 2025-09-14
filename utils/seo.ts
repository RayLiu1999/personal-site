// 多語言 SEO meta 工具函數
export const useLocalizedMeta = (metaData: {
  'zh-tw': {
    title: string
    description: string
    keywords?: string
  }
  'en': {
    title: string
    description: string
    keywords?: string
  }
}) => {
  const { locale } = useI18n()
  const currentMeta = metaData[locale.value as keyof typeof metaData] || metaData['zh-tw']
  
  return {
    title: currentMeta.title,
    meta: [
      {
        name: 'description',
        content: currentMeta.description
      },
      ...(currentMeta.keywords ? [{
        name: 'keywords',
        content: currentMeta.keywords
      }] : []),
      // Open Graph
      {
        property: 'og:title',
        content: currentMeta.title
      },
      {
        property: 'og:description',
        content: currentMeta.description
      },
      {
        property: 'og:locale',
        content: locale.value === 'zh-tw' ? 'zh_TW' : 'en_US'
      }
    ]
  }
}

// 專案詳細頁面的動態 meta
export const useProjectMeta = (project: any, locale: string) => {
  const baseUrl = 'https://ray-liu.dev'
  
  const titles = {
    'zh-tw': `${project.title} - Ray Liu 作品集`,
    'en': `${project.title} - Ray Liu Portfolio`
  }
  
  const descriptions = {
    'zh-tw': `${project.description} - 此專案展示了 ${project.technologies.join('、')} 等技術的應用。`,
    'en': `${project.description} - This project demonstrates the application of ${project.technologies.join(', ')} technologies.`
  }
  
  return {
    title: titles[locale as keyof typeof titles] || titles['zh-tw'],
    meta: [
      {
        name: 'description',
        content: descriptions[locale as keyof typeof descriptions] || descriptions['zh-tw']
      },
      {
        name: 'keywords',
        content: `${project.title}, ${project.technologies.join(', ')}, ${project.category}, Ray Liu`
      },
      {
        property: 'og:title',
        content: titles[locale as keyof typeof titles] || titles['zh-tw']
      },
      {
        property: 'og:description',
        content: descriptions[locale as keyof typeof descriptions] || descriptions['zh-tw']
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:image',
        content: `${baseUrl}${project.image}`
      },
      {
        property: 'og:locale',
        content: locale === 'zh-tw' ? 'zh_TW' : 'en_US'
      }
    ]
  }
}