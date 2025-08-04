import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  showBio?: boolean
}

export default function AuthorCard({ author, showBio = false }: AuthorCardProps) {
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const profilePhoto = author.metadata?.profile_photo
  const instagram = author.metadata?.instagram
  const website = author.metadata?.website

  return (
    <div className="flex items-start space-x-3">
      {/* Profile Photo */}
      {profilePhoto && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${profilePhoto.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={name}
            className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
            width={40}
            height={40}
          />
        </Link>
      )}

      <div className="flex-1 min-w-0">
        {/* Name */}
        <p className="text-sm font-medium text-gray-900">
          <Link 
            href={`/authors/${author.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {name}
          </Link>
        </p>

        {/* Bio (if shown) */}
        {showBio && bio && (
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {bio}
          </p>
        )}

        {/* Social Links (if shown) */}
        {showBio && (website || instagram) && (
          <div className="flex space-x-3 mt-3">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Website
              </a>
            )}
            {instagram && (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                @{instagram}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}