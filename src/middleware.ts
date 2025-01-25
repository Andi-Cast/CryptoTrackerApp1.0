import { NextResponse } from "next/server"

export function middleware(request: any) {
    const token = request.cookies.get('jwt');
    
    if (!token) {
        return NextResponse.redirect(
            new URL('/auth/signin', request.url)
        )
    }
    return NextResponse.next()
};

export const config = {
    matcher: ['/dashboard']
};