const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const {Storage} = require('@google-cloud/storage');
const path = require('path');

const  PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const storage = new Storage({
  keyFilename:path.join(__dirname,"./heroic-light-346712-cc20385e7f32.json"),
  projectId:'heroic-light-346712'
})

const bucket = 'drillcut-files';
const fileName = 'team.png';

const myBucket = storage.bucket(bucket);
const file = myBucket.file(fileName);

// [END storage_upload_file]


// https://drillcut-files.storage.googleapis.com/team.png

// https://momentsjewellery-eu.myshopify.com/admin/themes/128458227894/editor
// Route to get all Home Pages
app.get("/api/get-banner", (req,res)=>{
db.query("SELECT * FROM banner", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

 
app.get("/api/get-home-slides", (req,res)=>{
    db.query("SELECT * FROM slider", (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    });   });


    app.get("/api/get-token", (req,res)=>{
      db.query("SELECT * FROM instagram_token", (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      });   });


    app.get("/api/get-brands", (req,res)=>{
        db.query("SELECT * FROM brands_logo", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    app.get("/api/get-announcement", (req,res)=>{   
    db.query("SELECT * FROM announcement", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });
     });


//About Page
app.get("/api/get-team", (req,res)=>{
    db.query("SELECT * FROM employee_team", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    app.get("/api/get-customers-review", (req,res)=>{
        db.query("SELECT * FROM customer_say", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });


// Brands logo
          app.get("/api/get-brands-logo", (req,res)=>{                       //get brands
          db.query("SELECT * FROM brands_logo_2", (err,result)=>{
          if(err) {
          console.log(err)
          } 
          res.send(result)
          }); });

          app.post('/api/post-brands-logo', (req,res)=> {                 //post brands
          const logo = req.body.image;
          const brands_title = req.body.brands_title||'';
          db.query("INSERT INTO brands_logo_2 (logo,brands_title) VALUES (?,?)",[logo,brands_title], (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
          }); 
          })

              app.post('/api/update-brands-logo/:id',(req,res)=>{
                const id = req.params.id;
                const logo = req.body.image;
                const brands_title = req.body.brands_title||'';
                var sql = `UPDATE brands_logo_2 SET logo='${logo}' brands_title='${brands_title}' WHERE id = ${id}`;
              db.query(sql, function (err, result) {
                if (err) throw err;
                else res.send(result)
              });       
            });

            app.delete('/api/delete-brands-logo/:id',(req,res)=>{
              const id = req.params.id;
              db.query("DELETE FROM brands_logo_2 WHERE id= ?", id, (err,result)=>{
                  if(err)console.log(err);
                  else res.send(result);
              })
               })



// Image and Text
app.get("/api/get-image-text", (req,res)=>{                       //get image and text
db.query("SELECT * FROM image_text", (err,result)=>{
if(err) {
  console.log(err)
  } 
  res.send(result)
  });   });


  app.post('/api/post-image-text', (req,res)=> {                 //post image and text
    const image = req.body.image||'';
    const heading = req.body.heading||'';
    const paragraph = req.body.paragraph||'';
    const button_text = req.body.button_text||'';
    const button_link = req.body.button_link||'';
    db.query("INSERT INTO image_text (image,heading,paragraph,button_text,button_link) VALUES (?,?,?,?,?)",[image,heading,paragraph,button_text,button_link], (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    }); 
      })

      app.post('/api/update-image-text/:id',(req,res)=>{
        const id = req.params.id;
        const image = req.body.image||'';
        const heading = req.body.heading;
        const paragraph = req.body.paragraph;
        const button_text = req.body.button_text;
        const button_link = req.body.button_link;
        var sql = `UPDATE image_text SET image='${image}', heading='${heading}', paragraph='${paragraph}', button_text='${button_text}', button_link='${button_link}' WHERE id = ${id}`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result)
      });       
    });

    app.delete('/api/delete-image-text/:id',(req,res)=>{
      const id = req.params.id;
      db.query("DELETE FROM image_text WHERE id= ?", id, (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      })
       })



// testimonial
app.get("/api/get-testimonial", (req,res)=>{                       //get testimonial
  db.query("SELECT * FROM testimonial", (err,result)=>{
  if(err)console.log(err)
  else res.send(result)
  });});



  app.post('/api/post-testimonial', (req,res)=> {                 //post testimonial   
    const heading = req.body.heading||'';
    const paragraph = req.body.paragraph||'';
    const client_name = req.body.client_name||'';
    const button_text = req.body.button_text||'';
    const button_link = req.body.button_link||'';
    db.query("INSERT INTO testimonial (heading,paragraph,client_name,button_text,button_link) VALUES (?,?,?,?,?)",[heading,paragraph,client_name,button_text,button_link], (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    }); 
      })

      app.post('/api/update-testimonial/:id',(req,res)=>{
        const id = req.params.id;
        const client_name = req.body.client_name;
        const heading = req.body.heading;
        const paragraph = req.body.paragraph;
        const button_text = req.body.button_text;
        const button_link = req.body.button_link;
        var sql = `UPDATE testimonial SET heading='${heading}', paragraph='${paragraph}',client_name='${client_name}', button_text='${button_text}', button_link='${button_link}' WHERE id = ${id}`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result)
      });       
    });

    app.delete('/api/delete-testimonial/:id',(req,res)=>{
      const id = req.params.id;
      db.query("DELETE FROM testimonial WHERE id= ?", id, (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      })
       })


// contact
app.get("/api/get-contact", (req,res)=>{                       //get contact
  db.query("SELECT * FROM contact_api", (err,result)=>{
  if(err)console.log(err)
  else res.send(result)
  });});



  app.post('/api/post-contact', (req,res)=> {                 //post contact   
    const heading = req.body.heading;
    const api = req.body.api;
    const address = req.body.address||'';
    const tel = req.body.tel||'';
    const fax = req.body.fax||'';
    const time = req.body.time||'';
    db.query("INSERT INTO contact_api (api,heading,address,tel,fax,time) VALUES (?,?,?,?,?,?)",[api,heading,address,tel,fax,time], (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    }); 
      })

      app.post('/api/update-contact/:id',(req,res)=>{
        const id = req.params.id;
        const tel = req.body.tel;
        const heading = req.body.heading;
        const api = req.body.api;
        const address = req.body.address;
        const fax = req.body.fax;
        const time = req.body.time;
        var sql = `UPDATE contact_api SET api='${api}', heading='${heading}', address='${address}',tel='${tel}', fax='${fax}', time='${time}' WHERE id = ${id}`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result)
      });       
    });

    app.delete('/api/delete-contact/:id',(req,res)=>{
      const id = req.params.id;
      db.query("DELETE FROM contact_api WHERE id= ?", id, (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      })
       })

// explore_the_rewards_accordion
app.get("/api/get-explore_the_rewards_accordion", (req,res)=>{                       //get explore_the_rewards_accordion
  db.query("SELECT * FROM explore_the_rewards_accordion", (err,result)=>{
  if(err)console.log(err)
  else res.send(result)
  });});



  app.post('/api/post-explore_the_rewards_accordion', (req,res)=> {                 //post explore_the_rewards_accordion   
    const heading = req.body.heading;
    db.query("INSERT INTO explore_the_rewards_accordion (heading) VALUES (?)",[heading], (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    }); 
      })

      app.post('/api/update-explore_the_rewards_accordion/:id',(req,res)=>{
        const id = req.params.id;
        const heading = req.body.heading;
        var sql = `UPDATE explore_the_rewards_accordion SET heading='${heading}' WHERE id = ${id}`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result)
      });       
    });

    app.delete('/api/delete-explore_the_rewards_accordion/:id',(req,res)=>{
      const id = req.params.id;
      db.query("DELETE FROM explore_the_rewards_accordion WHERE id= ?", id, (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      })
       })


//top sections 
app.get("/api/get-about_top_section", (req,res)=>{                       //get about_top_section
  db.query("SELECT * FROM about_top_section", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-about_top_section',(req,res)=>{
    const title = req.body.title;
    const image = req.body.image;
    const content = req.body.content;
    const video = req.body.video;
    var sql = `UPDATE about_top_section SET title='${title}', content='${content}',image='${image}', video='${video}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});


//Drillclub image-text sections 
app.get("/api/get-drillclub_text_image", (req,res)=>{                       //get Drillclub image-text sections 
  db.query("SELECT * FROM drillclub_text_image", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-drillclub_text_image',(req,res)=>{              //update Drillclub image-text sections
    const banner = req.body.banner||'';
    const heading = req.body.heading;
    const subheading = req.body.subheading;
    var sql = `UPDATE drillclub_text_image SET heading='${heading}', subheading='${subheading}', banner='${banner}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});


//join_drillclub sections 
app.get("/api/get-join_drillclub", (req,res)=>{                       //get join_drillclub sections 
  db.query("SELECT * FROM join_drillclub", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-join_drillclub',(req,res)=>{              //update join_drillclub sections
    const heading = req.body.heading;
    const subheading = req.body.subheading;
    const button_label = req.body.button_label;
    const button_link = req.body.button_link;
    var sql = `UPDATE join_drillclub SET heading='${heading}', subheading='${subheading}', button_label='${button_label}', button_link='${button_link}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});


//rich_text sections 
app.get("/api/get-rich_text", (req,res)=>{                       //get rich_text sections 
  db.query("SELECT * FROM rich_text", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-rich_text',(req,res)=>{              //update rich_text sections
    const left_content = req.body.left_content;
    const right_content = req.body.right_content;
    var sql = `UPDATE rich_text SET left_content='${left_content}', right_content='${right_content}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
}); 



//explore_the_rewards sections 
app.get("/api/get-explore_the_rewards", (req,res)=>{                       //get explore_the_rewards sections 
  db.query("SELECT * FROM explore_the_rewards", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-explore_the_rewards',(req,res)=>{              //update explore_the_rewards sections
    const heading = req.body.heading;
    const subheading = req.body.subheading;
    const content = req.body.content;
    var sql = `UPDATE explore_the_rewards SET heading='${heading}', subheading='${subheading}', content='${content}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
}); 


//drillclub_custom_tag sections 
app.get("/api/get-drillclub_custom_tag", (req,res)=>{                       //get drillclub_custom_tag sections 
  db.query("SELECT * FROM drillclub_custom_tag", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-drillclub_custom_tag',(req,res)=>{              //update drillclub_custom_tag sections
    const heading = req.body.heading;
    const paragraph = req.body.paragraph;
    var sql = `UPDATE drillclub_custom_tag SET heading='${heading}', paragraph='${paragraph}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});



//drillclub_custom_tag_2 sections 
app.get("/api/get-drillclub_custom_tag_2", (req,res)=>{                       //get drillclub_custom_tag_2 sections 
  db.query("SELECT * FROM drillclub_custom_tag_2", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-drillclub_custom_tag_2/:id',(req,res)=>{              //update drillclub_custom_tag_2 sections
    const id = req.params.id;
    const logo = req.body.logo;
    const text = req.body.text;
    var sql = `UPDATE drillclub_custom_tag_2 SET logo='${logo}', text='${text}' WHERE id = ${id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});





//Sustainability 
app.get("/api/get-sustainability", (req,res)=>{                       //get sustainability
  db.query("SELECT * FROM sustainability", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });});


  app.post('/api/update-sustainability',(req,res)=>{
    const content = req.body.content;
    var sql = `UPDATE sustainability SET content='${content}' WHERE id = 1`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});



// employee_team
app.get("/api/get-employee_team", (req,res)=>{                       //get employee_team
  db.query("SELECT * FROM employee_team", (err,result)=>{
  if(err) {
  console.log(err)
  } 
  res.send(result)
  });   });


  app.post('/api/post-employee_team', (req,res)=> {                 //post employee_team   
    const profile = req.body.profile||'';
    const employee_name = req.body.employee_name||'';
    const title = req.body.title||'';
    const content = req.body.content||'';
    const button_text = req.body.button_text||'';
    const button_link = req.body.button_link||'';
    db.query("INSERT INTO employee_team (profile,employee_name,title,content,button_text,button_link) VALUES (?,?,?,?,?)",[profile,employee_name,title,content,button_text,button_link], (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    }); 
      })

      app.post('/api/update-employee_team/:id',(req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        const profile = req.body.profile;
        const content = req.body.content;
        const employee_name = req.body.employee_name;
        const button_text = req.body.button_text;
        const button_link = req.body.button_link;
        var sql = `UPDATE employee_team SET profile='${profile}', employee_name='${employee_name}',title='${title}', content='${content}', button_text='${button_text}', button_link='${button_link}' WHERE id = ${id}`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        else res.send(result)
      });       
    });

    app.delete('/api/delete-employee_team/:id',(req,res)=>{
      const id = req.params.id;
      db.query("DELETE FROM employee_team WHERE id= ?", id, (err,result)=>{
          if(err)console.log(err);
          else res.send(result);
      })
       })



// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM posts WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the post
app.post('/api/post-home-slides', (req,res)=> {
const image = req.body.image||'';
const logo = req.body.logo||'';
const heading = req.body.heading||'';
const button_text = req.body.button_text||'';
const button_link = req.body.button_link||'';

db.query("INSERT INTO slider (image,logo,heading,button_text,button_link) VALUES (?,?,?,?,?)",[image,logo,heading,button_text,button_link], (err,result)=>{
    if(err)console.log(err);
    else res.send(result);
}); 
  })


  app.post('/api/post-announcement', (req,res)=> {
    const logo = req.body.image;
    const announcement_title = req.body.announcement_title||'';
     res.send(req.body)

  //  const filePath = `./local/path/to/${logo}`;
  //  storage.bucket(bucket).upload(filePath, {
  //     destination: logo,
  // });

  //   console.log(`${filePath} uploaded to ${bucket}`);

    // db.query("INSERT INTO announcement (announcement_title,logo) VALUES (?,?)",[announcement_title,logo], (err,result)=>{
    //     if(err)console.log(err);
    //     else res.send(result);
    // }); 
      })

      app.post('/api/post-brands', (req,res)=> {
        const logo = req.body.logo||'';        
        db.query("INSERT INTO brands_logo (logo) VALUES (?)",[logo], (err,result)=>{
            if(err)console.log(err);
            else res.send(result);
        }); 
          })


      app.post('/api/post-banner', (req,res)=> {
        const image = req.body.image||'';
        const heading = req.body.heading||'';
        const subheading = req.body.subheading||'';
        const button_text = req.body.button_text||'';
        const button_link = req.body.button_link||'';
        
        db.query("INSERT INTO banner (banner,heading,subheading,button_text,button_link) VALUES (?,?,?,?,?)",[image,heading,subheading,button_text,button_link], (err,result)=>{
           if(err) {
           console.log(err)
           } 
           console.log(result)
        }); 
          })


// Route to like a post
app.post('/api/update-home-slides/:id',(req,res)=>{
    const image ='image';
    const logo = 'logo';
    const heading = req.body.heading;
    const button_text = req.body.button_text;
    const button_link = req.body.button_link;
    const id = req.params.id;
db.query(`UPDATE slider SET image='${image}',logo='${logo}',heading='${heading}',button_text='${button_text}',button_link='${button_link}' WHERE id = ${id}`, (err,result)=>{
    if (err) throw err;
    else res.send(result)
    });    
});

app.post('/api/update-announcement/:id',(req,res)=>{
    const id = req.params.id;
    const logo = req.body.logo||'';
    const announcement_title = req.body.announcement_title;

    var sql = `UPDATE announcement SET announcement_title='${announcement_title}', logo='${logo}' WHERE id = ${id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});

app.post('/api/update-brands/:id',(req,res)=>{
    const id = req.params.id;
    const logo = req.body.logo||'';
    var sql = `UPDATE brands_logo SET logo='${logo}' WHERE id = ${id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });       
});

app.post('/api/update-token',(req,res)=>{
  const token = req.body.token||'';
  var sql = `UPDATE instagram_token SET token='${token}' WHERE id = 1`;
db.query(sql, function (err, result) {
  if (err) throw err;
  else res.send(result)
});       
});


app.post('/api/update-banner/:id',(req,res)=>{
    const id = req.params.id;
    const banner = '';  
    const heading = req.body.heading;  
    const subheading = req.body.subheading;  
    const button_text = req.body.button_text;  
    const button_link = req.body.button_link;  
    var sql = `UPDATE banner SET banner = '${banner}', heading = '${heading}', subheading = '${subheading}', button_text = '${button_text}', button_link = '${button_link}' WHERE id = ${id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    else res.send(result)
  });

});

// Route to delete a post

app.delete('/api/delete-home-slides/:id',(req,res)=>{
const id = req.params.id;
db.query("DELETE FROM slider WHERE id= ?", id, (err,result)=>{
    if(err)console.log(err);
    else res.send(result);
})
 })

 app.delete('/api/delete-announcement/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM announcement WHERE id= ?", id, (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
    })
     })

     app.delete('/api/delete-banner/:id',(req,res)=>{
        const id = req.params.id;
        db.query("DELETE FROM banner WHERE id= ?", id, (err,result)=>{
        if(err)console.log(err);
        else res.send(result);
        })
         })


         app.delete('/api/delete-brands/:id',(req,res)=>{
            const id = req.params.id;
            db.query("DELETE FROM brands_logo WHERE id= ?", id, (err,result)=>{
            if(err)console.log(err);
            else res.send(result); 
            })
             })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})