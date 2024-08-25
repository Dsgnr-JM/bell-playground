const form = document.querySelector("form")
let script = ""

form.addEventListener("submit",e=>{
    e.preventDefault()
    const $firstParams = [...document.querySelectorAll("form div:nth-child(1) input")]
    const $secondParam = [...document.querySelectorAll("form > div:nth-child(2) input")].find(i => i.checked)
    const $threeParam = [...document.querySelectorAll("form > div:nth-child(3) input, textarea")].filter(i => i.checked || (i.value && (i.type !== 'radio')))
    const first = "{\n" + $firstParams.filter(i => i.value).map($param => `${$param.name}: '${$param.value}'`).join(",\n") + "\n},"
    const second = "'"+$secondParam.value+"',"
    const three = "{\n" + $threeParam.filter(i => i.value).map($param => `${$param.name}: ${($param.checked && $param.value == "on" ? true : false) || ($param.value !== "on" ? "'"+$param.value+"'": false)}`).join(",\n") + "\n}"
    const body = "const params = [" + first + "\n" + second + "\n" + three +"]"
    const head = "const bell = new Bell(...params)"
    const launch = "bell.launch()"


    script = body + "\n" + head +"\n" + launch
    eval(script)
    document.querySelector("#placeholder").innerHTML = `<code class="languaje-javascript atom-one-dark">${script}</code>`
    hljs.highlightAll()
})

document.querySelector("#copy").addEventListener("click",()=>{
    navigator.clipboard.writeText(script)
})
