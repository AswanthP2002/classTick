export default function useStorage(data, key){
    //saving on locastorage
    localStorage.setItem(key, JSON.stringify(data))
    const storedData = JSON.parse(localStorage.getItem(key))
    return storedData
}