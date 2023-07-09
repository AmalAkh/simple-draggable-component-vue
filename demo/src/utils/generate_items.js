function generateId()
{
    return String(Math.round(Math.random()*100000));
}
export default function generateItems()
{
    let group1 = [];
    let group2 = [];
    for(let i = 0 ; i < 10; i++)
    {
        group1.push({name:`item ${i+1}`, id:generateId()});
    }
    for(let i = 10 ; i < 20; i++)
    {
        group2.push({name:`item ${i+1}`, id:generateId()});
    }
    return [group1, group2]
}