import cn from 'classnames';

export default function PageTitle({ className, children }) {
    return (
        <h1 className={cn('text-6xl font-bold mb-4', className)}>{children}</h1>
    );
}
