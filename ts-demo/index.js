var Student = (function () {
    // public 修饰的属性直接会作为实例属性
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
})();
function greeter(person) {
    return "Hello, " + person.firstName + person.lastName;
}
var user = new Student('jane', 'M.', "User");
document.body.innerHTML = greeter(user);
