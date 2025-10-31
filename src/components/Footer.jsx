import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="md:flex md:justify-evenly">
                    <div className="md:w-1/3 mb-8 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.svg" alt="Bookify logo" className="h-10" />
                        </div>
                        <p className="text-2xl font-semibold">Made with <span className="text-blue-400">💙</span> by Vishal Agrawal</p>

                        <div className="flex gap-4 mt-6">
                            <a href="#" aria-label="instagram" className="p-2 bg-white/8 rounded-md hover:bg-white/10">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="#" aria-label="linkedin" className="p-2 bg-white/8 rounded-md hover:bg-white/10">
                                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4zM8.5 8.5h3.84v2.14h.05c.54-1.02 1.86-2.14 3.83-2.14 4.1 0 4.86 2.7 4.86 6.21V24h-4V15.8c0-2.01-.04-4.59-2.8-4.59-2.81 0-3.24 2.2-3.24 4.45V24h-4z" /></svg>
                            </a>
                            <a href="#" aria-label="twitter" className="p-2 bg-white/8 rounded-md hover:bg-white/10">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5A4.5 4.5 0 0023 3z" /></svg>
                            </a>
                            <a href="#" aria-label="github" className="p-2 bg-white/8 rounded-md hover:bg-white/10">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.38-3.87-1.38-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.76.4-1.26.72-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.5 3.17-1.18 3.17-1.18.65 1.65.25 2.87.12 3.17.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.41.35.78 1.05.78 2.12v3.15c0 .3.2.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-2xl font-semibold mb-4">Sitemap</h4>
                        <div className="space-y-3 list-none">
                            <li><a href="#" className="text-gray-300!">Home</a></li>
                            <li><a href="#" className="text-gray-300!">Add Listing</a></li>
                            <li><a href="#" className="text-gray-300!">View Orders</a></li>
                            <li><a href="#" className="text-gray-300!">Log out</a></li>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-2xl font-semibold mb-4">Informative</h4>
                        <div className="space-y-3 list-none">
                            <li><a href="#" className="text-gray-300!">FAQ</a></li>
                            <li><a href="#" className="text-gray-300!">Privacy Policy</a></li>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
