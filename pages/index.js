import fetcher from '@/utils/fetcher'
import React, { useState } from 'react'
import useSWR from 'swr'

function HomePage() {
  const [page , setPage] = useState(1)
  const { data, error, isLoading } = useSWR(
    `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher,{
      revalidateOnFocus: false, 
      revalidateOnReconnect: false,
      
    }
  )

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error loading news</div>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Top Stories</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.articles?.map((story, i) => (
          <div
            key={i}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {story.urlToImage && (
              <img
                src={story.urlToImage}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
            )}

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
                <p> {new Date(story.publishedAt).toLocaleDateString()}</p>
                <p> {story.source?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='w-full flex justify-center m-10'>
        <div className="flex justify-center flex-row items-center gap-10"> 
          <button
            onClick={() => page > 1 && setPage((page) => page - 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Previous
          </button>
           <button
            onClick={() => data?.articles?.length > 0 && setPage((page) => page + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
