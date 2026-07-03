import axios from 'axios';
import { useCallback } from 'react';

const MainComponent = () => {
    const getAllNumbers = useCallback(async() => {
        try {
            const values = await axios.get('/api/values/all');
            console.log(values);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    }, [])
  return (
    <div>
        <button onClick={getAllNumbers}>Get All Numbers</button>
    </div>
  )
    
}

export default MainComponent;