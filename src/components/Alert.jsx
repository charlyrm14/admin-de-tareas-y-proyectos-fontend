import { MdWarningAmber, MdCheckCircleOutline } from "react-icons/md";

export function Alert ( { alert } ) {

    return (
        <div className={`border-2 ${ alert.error ? 'border-red-600 text-red-600' : 'border-green-600 text-green-600' } rounded-lg text-center p-3 uppercase text-sm my-5`}>
            {
                alert.error ? (
                    <>
                        <p>
                            <span className="inline-block"> <MdWarningAmber/> </span> { alert.message }
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            <span className="inline-block"> <MdCheckCircleOutline/> </span> { alert.message }
                        </p>
                    </>
                )
            }
        </div>
    )
}