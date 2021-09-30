import cn from 'classnames';

export default function PageSubtitle({ className, children }) {
    return <h1 className={cn('text-2xl', className)}>{children}</h1>;
}
