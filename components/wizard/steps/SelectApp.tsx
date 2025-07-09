"use client"

import { useState, useEffect, useMemo } from "react"
import { Building2, Search, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWizardState } from "@/hooks/useWizardState"

interface ApiPost {
  id: number
  title: string
  body: string
  userId: number
}

const ITEMS_PER_PAGE = 20
const DEBOUNCE_DELAY = 500

export function SelectApp() {
  const { stepData, updateStepData } = useWizardState()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApp, setSelectedApp] = useState(stepData.selectApp?.applicationId || "")
  const [isLoading, setIsLoading] = useState(false)
  const [apiData, setApiData] = useState<ApiPost[]>([])
  const [error, setError] = useState<string | null>(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1) // Reset to first page on new search
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearchTerm.trim()) {
        setApiData([])
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${debouncedSearchTerm}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ApiPost[] = await response.json()
        setApiData(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
        setError(`Failed to fetch data: ${errorMessage}`)
        setApiData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [debouncedSearchTerm])

  // Paginated data for performance optimization
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return apiData.slice(startIndex, endIndex)
  }, [apiData, currentPage])

  const totalPages = Math.ceil(apiData.length / ITEMS_PER_PAGE)

  // Handle selection
  const handleSelection = (postId: string) => {
    const selectedPost = apiData.find((post) => post.id.toString() === postId)
    if (selectedPost) {
      updateStepData("selectApp", {
        applicationId: selectedPost.id.toString(),
        applicationName: selectedPost.title,
        description: selectedPost.body,
        riskLevel: selectedPost.userId <= 3 ? "high" : selectedPost.userId <= 7 ? "medium" : "low",
      })
    }
  }

  useEffect(() => {
    if (selectedApp) {
      handleSelection(selectedApp)
    }
  }, [selectedApp])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>,
      )
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm border rounded transition-colors ${
            i === currentPage ? "bg-[#0095FF] text-white border-[#0095FF]" : "hover:bg-gray-50"
          }`}
        >
          {i}
        </button>,
      )
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 transition-colors"
        >
          Next
        </button>,
      )
    }

    return <div className="flex items-center justify-center gap-2 mt-4">{pages}</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#000067]">Select Application</h2>
        <p className="text-[#0000C9]">Search and choose the application you want to create IPRM documentation for</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0095FF]" />
            Application Search
          </CardTitle>
          <CardDescription>
            Enter a user ID to search for available applications. The system will fetch up to 20,000 results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Enter user ID to search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
              type="number"
              min="1"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-[#0095FF]" />
            )}
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-[#0095FF]">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Searching applications...</span>
              </div>
            </div>
          )}

          {/* Results */}
          {!isLoading && debouncedSearchTerm && apiData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#000067]">
                  Found {apiData.length} applications for User ID: {debouncedSearchTerm}
                </h3>
                <span className="text-xs text-gray-500">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, apiData.length)} of {apiData.length}
                </span>
              </div>

              <RadioGroup value={selectedApp} onValueChange={setSelectedApp}>
                <div className="space-y-3">
                  {paginatedData.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors"
                    >
                      <RadioGroupItem value={post.id.toString()} id={post.id.toString()} className="mt-1" />
                      <Label htmlFor={post.id.toString()} className="flex-1 cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-[#000067] capitalize line-clamp-1">{post.title}</h4>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  post.userId <= 3
                                    ? "bg-red-100 text-red-800"
                                    : post.userId <= 7
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {post.userId <= 3 ? "high" : post.userId <= 7 ? "medium" : "low"} risk
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">ID: {post.id}</span>
                            </div>
                          </div>
                          <p className="text-sm text-[#0000C9] line-clamp-2">{post.body}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {renderPagination()}
            </div>
          )}

          {/* No Results */}
          {!isLoading && debouncedSearchTerm && apiData.length === 0 && !error && (
            <div className="text-center py-8">
              <div className="text-[#0000C9] mb-2">No applications found for User ID: {debouncedSearchTerm}</div>
              <div className="text-sm text-gray-500">
                Try searching with a different user ID (1-10 typically have results)
              </div>
            </div>
          )}

          {/* Initial State */}
          {!debouncedSearchTerm && !isLoading && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <div className="text-[#0000C9] mb-2">Start by entering a user ID to search for applications</div>
              <div className="text-sm text-gray-500">
                The system will search through up to 20,000 available applications
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
