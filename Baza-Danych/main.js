const stworz_db = require ("./stworz_db")
const stworz_kolekcje = require ("./stworz_kolekcje")
const wprowadz_jeden_dokument = require ("./wprowadz_jeden_dokument")

stworz_db.stworzdb("bazaprojekt")
stworz_kolekcje.stworzkolekcje("bazaprojekt","uzytkownicy")
var myobj = { name: "John Doe", lastTimeOnline: 124018032022, lastTimeInOffice: 130018032022, lastUsedDesk: 42, department: "IT", position: "Web Developer", supervisor: "Donald Trump", telephone: 123456789, email: "john.doe@cool-company.com" };
wprowadz_jeden_dokument.wprowadzjedendokument("bazaprojekt","uzytkownicy",myobj)
