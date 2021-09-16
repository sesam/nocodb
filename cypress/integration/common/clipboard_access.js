import { loginPage, projectsPage } from "../../support/page_objects/navigation"

///////////////////////////////////////////////////////////
// Auth token info
// Properties: length 216 char

const authInfoVerification = () => {}
const authProjectInfoVerification = () => {}

const genTest = (type) => {

    describe(`${type.toUpperCase()} api - Clipboard access`, () => {

        // Run once before test- create project (rest/graphql)
        //
        before(() => {
            loginPage.signIn({ username: 'user@nocodb.com', password: 'Password123.' })
            projectsPage.openProject('sakilaDb')
        })

        it('1. Copy authentication information', () => {
            // Using Clipboardy
            // https://stackoverflow.com/questions/61650737/how-to-fetch-copied-to-clipboard-content-in-cypress
            //
            cy.get('header.v-toolbar').eq(0).find('button').eq(5).click()
            cy.getActiveMenu().contains('Copy auth token').click({ native: true })
                .then(() => {
                    cy.task('getClipboard').then(($clip) => {
                        const auth_token = $clip
                        cy.log('Auth Token', auth_token)
                    })
                })
            cy.wait(5000)

            // Using cy.window()
            // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__clipboard/cypress/integration/permissions-spec.js
            cy.get('header.v-toolbar').eq(0).find('button').eq(5).click()
            cy.getActiveMenu().contains('Copy auth token').click()
            // confirm the clipboard's contents
            cy.window().its('navigator.clipboard')
                .invoke('readText')
                .should('have.length', 213)
            cy.wait(5000)            
        } )

        it('1. Copy project information', () => authProjectInfoVerification )
    })
}



genTest('rest')

/**
 * @copyright Copyright (c) 2021, Xgene Cloud Ltd
 *
 * @author Pranav C Balan <pranavxc@gmail.com>
 * @author Raju Udava <sivadstala@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */