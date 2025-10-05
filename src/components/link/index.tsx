'use client'

import { Link as NextLink } from '@/i18n/navigation';
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

function Link(
    {
        href,
        children,
        ...rest
    }: {
        href: string;
        children: React.ReactNode;
    } & HTMLAttributes<HTMLAnchorElement>
) {

    const [prefetching, setPrefetching] = useState<boolean>(false)
    const linkRef = useRef<HTMLAnchorElement>(null)

    const setPrefetchingTrue = () => {
        setPrefetching(true)
    }

    const setPrefetchingFalse = () => {
        setPrefetching(false)
    }

    useEffect(() => {
        if (!linkRef.current) return
        linkRef?.current?.addEventListener('mouseover', setPrefetchingTrue)
        linkRef?.current?.addEventListener('mouseleave', setPrefetchingFalse)

        return () => {
            linkRef?.current?.removeEventListener('mouseover', setPrefetchingTrue)
            linkRef?.current?.removeEventListener('mouseleave', setPrefetchingFalse)
        }
    }, [prefetching])

    return (
        <NextLink ref={linkRef} href={href} prefetch={prefetching} {...rest}>
            {children}
        </NextLink>
    )
}

export default Link
