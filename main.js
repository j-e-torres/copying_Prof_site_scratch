const express = require('express');
const app = express();
const users = require('./usersList.js');
const { head, homeLink } = require('./appHelpers.js')
const PORT = 3001;

app.use(express.static('assets'))
// app.use('/assets', express.static(path.join(__dirname, 'style.css')))


app.get('/', (req, res) => {
    const html = `<!DOCTYPE html>
    <html>
        ${ head }
        <body>
            ${ homeLink }
            <div id='user-link'>
                <a href='/users'>Users</a>
            </div>
            
        </body>
    </html>
    `
    res.send(html);
})

app.get('/users', (req, res) => {
    const html = `<!DOCTYPE html>
    <html>
        ${ head }
        <body>
            ${ homeLink }

            <div id='user-link'>
                <a href='/users'>Users</a>
                
                <div id='users-list'>
                    <ul>
                        ${ users.map(user => `
                            <li>
                            <a href='/users/${ user }' >
                                ${ user }
                            </a>
                            </li>
                        
                        `).join('')}
                    </ul>
                </div>
            </div>
            
        </body>
    </html>
    `
    res.send(html);
})

app.get('/users/:name', (req, res, next) => {
    const reqName = req.params.name;
    const html = `<!DOCTYPE html>
    <html>
        ${ head }
        <body>
            ${ homeLink }

            <div id='user-link'>
                <a href='/users'>Users</a>
                
                <div id='user-selected'>
                    ${ users.find(user => {
                        return user === reqName;
                    }) }
                </div>
            </div>
            
        </body>
    </html>
    `
    res.send(html)
})


app.listen(PORT, () => {
    console.log('Load successful');
    console.log(`App listening in port ${PORT}`);
})

