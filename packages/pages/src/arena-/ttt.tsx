import React, { useEffect, useState } from 'react'

export default function TTT() {
    // Create the count state.
    const [count, setCount] = useState(0)
    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000)
        return () => clearTimeout(timer)
    }, [count, setCount])
    // Return the App component.
    return <div className="App">TTT{count}</div>
}
