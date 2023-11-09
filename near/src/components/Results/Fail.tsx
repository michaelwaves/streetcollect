export default function Fail() {
    return (
        <div>
            <h1>That didn&apos;t work</h1>
            <p>
                We&apos;re sorry our website isn&apos;t cooperating today. Web3 is an exciting new technology, where things move fast and break often. We hope we at least gave you a lead
            </p>
            <div className="flex flex-col md:flex-row gap-4 p-4 ">
                <button>
                    Try Again
                </button>
                <button>
                    Negotiate
                </button>
            </div>
        </div>
    )
}