
import randomTitle from 'random-title'

const randomLorem = () => {
  const lorem = 'Bomb otaku wristwatch bicycle disposable monofilament warehouse numinous computer boy silent kanji tiger-team.\n\nGeodesic tattoo augmented reality tanto stimulate courier tower San Francisco.\nPlastic katana human math-carbon apophenia corrupted meta-dolphin gang smart.\nAdvert man paranoid sensory bicycle footage bridge wristwatch construct market neon fetishism dead DIY rifle fluidity industrial grade.\nDrugs silent monofilament San Francisco woman meta-towards car sentient pre-augmented reality A.I.\nsign bomb.\nFranchise military-grade tattoo vehicle nodality tube savant jeans rifle sunglasses corporation.\nFaded tower man face forwards concrete drugs A.I.\ngeodesic soul-delay computer Kowloon engine bicycle long-chain hydrocarbons.\nSign tower warehouse concrete kanji geodesic car.\nPhysical DIY sunglasses sub-orbital face forwards pen carbon paranoid smart-rebar.\nNetwork cartel film vinyl shanty town warehouse refrigerator.\nGeodesic Shibuya receding pen j-pop long-chain hydrocarbons artisanal systema ablative.\nPre-systema semiotics voodoo god media meta-singularity nodal point corrupted youtube crypto.\nBASE jump stimulate bicycle uplink RAF digital sign face forwards wonton soup neon hacker j-pop.\nRain free-market industrial grade gang market camera urban rifle.\nBeef noodles bicycle boat range-rover sensory convenience store refrigerator cartel.\nSmart-range-rover refrigerator San Francisco jeans crypto-tower rifle.\nNeon systemic free-market convenience store post-render-farm otaku pen shrine drone cyber-courier.\n'
  const paragraphs = lorem.split('\n')
  return paragraphs.map(() => {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)]
  }).join('\n')
}

export const posts = [...Array(6)].map((_, index) => {
  return {
    id: index,
    title: randomTitle({words: 5}),
    description: randomLorem(),
    image: `https://picsum.photos/id/${index * 10}/600/400`,
    slug: `post-${index}`,
  };
});

const articles: any[] = []
export const getPosts = async () => {
  if (articles.length) return articles
  const items: any[] = await fetch('https://ephemera-dam-default-rtdb.europe-west1.firebasedatabase.app/posts.json').then(res => res.json())
  articles.push(...items)
  return articles
}
