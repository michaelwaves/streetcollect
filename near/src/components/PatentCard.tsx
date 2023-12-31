export default function PatentCard({ title, description, price }: { [props: string]: any }) {
    return (
        <>
            <div className="px-4 py-5 sm:px-6 flex justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                </h3>
                <h2 className="mt-1 max-w-2xl text-sm text-s-3">
                    {price}
                </h2>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-between">
                        <dt className="text-sm font-medium">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {description}
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}