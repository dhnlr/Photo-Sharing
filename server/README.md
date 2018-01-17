# Photo Sharing
Social media with photo sharing MVP

# Route List

### Auth API
List of auth routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /signin             | POST     | Sign user                    |
| /signup         | POST    | Signup                    |

### Photo and Comment API
List of photo and comment routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /photos/            | GET     | Get all photo                   |
| /photos/:id/c         | GET    | Get photo by id                    |
| /photos/username/:id         | GET    | Get photo by username                    |
| /photos/         | POST    | Add new photo                    |
| /photos/:id/comment         | POST    | Add comment of a photo                    |
| /photos/:id         | PUT    | Edit one photo by id                    |
| /photos/:id/comments/:comment         | GET    | Edit comment of a photo                    |
| /photos/:id         | DELETE    | Delete a photo                    |
| /photos/:id/comment/:comment         | Delete    | Delete comment of a photo                    |
