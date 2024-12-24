import { Button } from '@/components/ui/button';

export default async function Home() {
    return (
        <main className="bg-blue-500 text-special flex justify-between px-12 py-4 ">
            <h1>home page</h1>
            <Button className="bg-fuchsia-900 ">Click me</Button>
        </main>
    );
}
