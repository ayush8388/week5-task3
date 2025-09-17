import React from 'react'
import fetcher from '@/utils/fetcher'
import useSWRInfinite from 'swr/infinite'
function Infinite() {
    const getKey = (index, previousPageData) => {
        if (previousPageData && previousPageData.articles.length === 0) return null
        return `https://newsapi.org/v2/everything?q=apple&from=2025-09-16&to=2025-09-16&sortBy=popularity&page=${index + 1}&pageSize=8&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    }

    const {data, error, size, setSize} = useSWRInfinite(getKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if(!data) return <div>Loading...</div>
    if(error) return <div>Error loading news</div>
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Top Stories</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((page, Index) =>
          page.articles.map((story, i) => (
            <div
              key={`${Index}-${i}`}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
                <img
                  src={story.urlToImage}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {story.title}
                </h2>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                  {story.description}
                </p>

                <div className="mt-4">
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read More →
                  </a>
                </div>

                <div className="mt-4 text-xs text-gray-500 border-t pt-2">
                  <p>{story.publishedAt}</p>
                  <p>{story.source?.name}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='w-full flex justify-center m-10'>
            <button 
            onClick={() => setSize(size + 1)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                load more
            </button>
      </div>
          


    
    </div>
  )
}

export default Infinite