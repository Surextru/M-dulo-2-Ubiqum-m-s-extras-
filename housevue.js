let houseVue = new Vue({
    el: '#house',
    data: {
        membershous: [],
        checkedName: [],
        estateSelect: "all",
        pctRep: [],
        pctDem: [],
        pctInd: [],
        mediaRep: 0, mediaDem: 0, mediaInd: 0,
        mostLoyalArr: [],
        lessLoyalArr: [],
        mostAttenArr: [],
        lessAttenArr: [],
        conectado: false,
        cont: false,
    },
    methods: {
        getData() {
            fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
                headers: {
                    'X-API-KEY': "p3BhceiRsMIz4nKrDxEnNukK3uoAMkul8qt1YuGp"
                }
            }).then(function (data) {
                return data.json();
            }).then(json => {
                houseVue.membershous = json.results[0].members;
                houseVue.getGlance();
                houseVue.getMostLoyal();
                houseVue.getLessLoyal();
                houseVue.getLessAtten();
                houseVue.getMostAtten();
                houseVue.conectado = true;
            }).catch(err => {
                if (err) {
                    return alert("base de datos a tomar por culo");
                }
            })
        },
        getGlance() {
            this.membershous.forEach(member => {
                if (member.party == "R") { this.pctRep.push(member.votes_with_party_pct) }
                if (member.party == "D") { this.pctDem.push(member.votes_with_party_pct) }
                if (member.party == "I") { this.pctInd.push(member.votes_with_party_pct) }
            });

            //media republis
            for (let i = 0; i < this.pctRep.length; i++) {
                this.mediaRep += this.pctRep[i];
            }
            this.pctRep.length == 0 ? this.mediaRep = 0 : this.mediaRep = this.mediaRep / this.pctRep.length;

            //media demos
            for (let i = 0; i < this.pctDem.length; i++) {
                this.mediaDem += this.pctDem[i];
            }
            this.pctDem.length == 0 ? this.mediaDem = 0 : this.mediaDem = this.mediaDem / this.pctDem.length;

            //media indepes
            for (let i = 0; i < this.pctInd.length; i++) {
                this.mediaInd += this.pctInd[i];
            }
            this.pctInd.length == 0 ? this.mediaInd = 0 : this.mediaInd = this.mediaInd / this.pctInd.length;
        },
        getMostLoyal() {
            this.mostLoyalArr = [];
            this.membershous.sort((a, b) => {
                return (b.votes_with_party_pct - a.votes_with_party_pct);
            });
            let tenprc = this.membershous.length * 0.1;
            for (let i = 0; i < tenprc; i++) {
                this.mostLoyalArr.push(this.membershous[i])
            }
            this.mostLoyalArr;
        },
        getLessLoyal() {
            this.lessLoyalArr = [];
            this.membershous.sort((a, b) => {
                return (a.votes_with_party_pct - b.votes_with_party_pct);
            });
            let tenprc = this.membershous.length * 0.1;
            for (let i = 0; i < tenprc; i++) {
                this.lessLoyalArr.push(this.membershous[i])
            }
            this.lessLoyalArr;
        },
        //Attendance
        getLessAtten() {
            this.lessAttenArr = [];
            this.membershous.sort(function (a, b) {
                return (a.missed_votes_pct - b.missed_votes_pct)
            });
            let tenprc = this.membershous.length * 0.1;
            for (let i = 0; i < tenprc; i++) {
                this.lessAttenArr.push(this.membershous[i])
            }
            this.lessAttenArr;
        },
        getMostAtten() {
            this.mostAttenArr = [];
            this.membershous.sort(function (a, b) {
                return (b.missed_votes_pct - a.missed_votes_pct)
            });
            let tenprc = this.membershous.length * 0.1;
            for (let i = 0; i < tenprc; i++) {
                this.mostAttenArr.push(this.membershous[i])
            }
            this.mostAttenArr;
        },
        ordenarPor: function (arg) {
            if (arg == 'Name') {
                this.cont = !this.cont;
                if (this.cont) {
                    this.membershous.sort((a, b) => (a.first_name
                        > b.first_name
                    ) ? 1 : ((b.first_name
                        > a.first_name
                    ) ? -1 : 0));
                }

                else {
                    this.membershous.sort((a, b) => (b.first_name
                        > a.first_name
                    ) ? 1 : ((a.first_name
                        > b.first_name
                    ) ? -1 : 0));
                }
            }
            else if (arg == 'Party') {
                this.cont = !this.cont;
                if (this.cont) {
                    this.membershous.sort((a, b) => (a.party
                        > b.party
                    ) ? 1 : ((b.party
                        > a.party
                    ) ? -1 : 0));
                }
                else {
                    this.membershous.sort((a, b) => (b.party
                        > a.party
                    ) ? 1 : ((a.party
                        > b.party
                    ) ? -1 : 0));
                }
            }
            else if (arg == 'State') {
                this.cont = !this.cont;
                if (this.cont) {
                    this.membershous.sort((a, b) => (a.state
                        > b.state
                    ) ? 1 : ((b.state
                        > a.state
                    ) ? -1 : 0));
                }
                else {
                    this.membershous.sort((a, b) => (b.state
                        > a.state
                    ) ? 1 : ((a.state
                        > b.state
                    ) ? -1 : 0));
                }
            }
            else if (arg == 'Senio') {
                this.cont = !this.cont;
                if (this.cont) {
                    this.membershous.sort(function (a, b) {
                        return (a.seniority - b.seniority)
                    });
                }
                else {
                    this.membershous.sort(function (a, b) {
                        return (b.seniority - a.seniority)
                    });
                }
            }
            else if (arg == 'Pct') {
                this.cont = !this.cont;
                if (this.cont) {
                    this.membershous.sort(function (a, b) {
                        return (a.votes_with_party_pct - b.votes_with_party_pct)
                    });
                }
                else {
                    this.membershous.sort(function (a, b) {
                        return (b.votes_with_party_pct - a.votes_with_party_pct)
                    });
                }
            }
        }
    },
    computed: {
        filtroPartido() {
            return this.membershous.filter((check) => ((this.checkedName.includes(check.party) || this.checkedName.length == 0)) && ((this.estateSelect == check.state) || (this.estateSelect == "all")))
        },
        rellenarEstado() {
            return [...new Set(this.membershous.map(est => est.state))].sort();
        },

    },
    created() {
        this.getData();
        console.log("ok");
    }
})