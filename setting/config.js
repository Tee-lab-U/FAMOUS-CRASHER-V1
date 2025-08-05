const fs = require('fs')

global.owner = "2348126003566"
global.footer = "𝙁𝘼𝙈Ø𝙐𝙎 𝘿𝙀𝙑" 
global.status = true 
global.idSaluran = "120363330289360382@newsletter"
global.mess = {
    owner: "[ ! ] USER IS NOT OWNER"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})