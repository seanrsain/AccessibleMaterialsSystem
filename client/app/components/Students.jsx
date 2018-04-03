import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import AjaxPromise from 'ajax-promise';
import Store from '../reducers/store.js';
import loadingUntil from '../reducers/loading.js';
import { loadStudents } from '../actions/students.js';
import Modal from 'react-modal';

class Students extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addStudentVisible: false,
      currentList: Store.getState().students,
    };
  }

  componentDidMount() {
    this._updateStudents();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentList: nextProps.students,
    })
  }

  _updateStudents() {
    $.get('/api/student/students', {
      patronid: Store.getState().user.id,
    })
    .done((response) => {
      console.log("load students", response);
      Store.dispatch(loadStudents(response));
    })
    .fail((err) => {
      console.log("/api/user/index error", err);
    });
  }

  _renderUser(user) {
    return (
      <tr className="StudentList__row" key={user.id}>
        <td className="StudentList__td"><input type="checkbox" id={`student_${user.id}`} /></td>
        <td className="StudentList__td">{`${user.Fname} ${user.Lname}`}</td>
        <td className="StudentList__td">{`Atlanta Public Schools`}</td>
        <td className="StudentList__td">{`Blind (MDB)`}</td>
        <td className="StudentList__td">{user.DisabilityTypeCert ? `Active` : `Approval Pending`}</td>
      </tr>
    );
  }

  _viewAddStudent() {
    this.setState({ addStudentVisible: true, });
  }

  _closeAddStudent() {
    this.setState({ addStudentVisible: false, });
  }

  _addStudent(e) {
    e.preventDefault();
    // TODO: Use AjaxPromise.
    $.post("api/student/register", $("#add-student-form").serialize())
      .done((data) => {
        console.log(data);
        this.setState({ addStudentVisible: false, });
        this._updateStudents();
      })
      .fail((data) => {
        console.log("Login error: ", data.responseText);
      });
  }

  _searchStudent() {
    const query = $('#student_search')[0].value.toUpperCase();
    if(query) {
      let students = Store.getState().students.filter((student) => {
        if(student.Fname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(student.Mname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else if(student.Lname.toUpperCase().indexOf(query) > -1) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ currentList: students, })
    } else {
      this.setState({ currentList: Store.getState().students, })
    }
  }

  render() {
    return (
      <div className="Students">
        <h1 className="Students__title">Students</h1>
        <div className="StudentList">
          <div className="StudentList__header">
            <div className="StudentList__title">Student List</div>
            <div className="StudentList__actions">
              <input type="search" id="student_search" className="StudentList__search" placeholder="Search for student..." onChange={this._searchStudent.bind(this)} />
              <button className="StudentList__button" onClick={this._viewAddStudent.bind(this)}>+ Add</button>
              <button className="StudentList__button">Deactivate</button>
            </div>
          </div>
          <table className="StudentList__table">
            <thead>
              <th className="StudentList__columnHeader StudentList__columnHeader--checkbox"><input type="checkbox" id="student_all" /></th>
              <th className="StudentList__columnHeader StudentList__columnHeader--name">Name</th>
              <th className="StudentList__columnHeader StudentList__columnHeader--school">School Code</th>
              <th className="StudentList__columnHeader StudentList__columnHeader--disability">Disability Code</th>
              <th className="StudentList__columnHeader StudentList__columnHeader--status">Status</th>
            </thead>
            <tbody>
              {this.state.currentList && this.state.currentList.length > 0 ? this.state.currentList.map(this._renderUser) : (
                <tr className="StudentList__row">
                  <td colSpan={5} className="StudentList__td">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={this.state.addStudentVisible}
          onRequestClose={this._closeAddStudent.bind(this)}
          closeTimeoutMS={100}
          style={{}}
          contentLabel="Modal"
        >
          <div className="AddStudent">
            <h3 className="AddStudent__title">Add Student</h3>
            <form id="add-student-form" className="AddStudent__form" onSubmit={this._addStudent.bind(this)}>

              <label htmlFor="DisabilityTypeCert">Certification Type</label>
              <select name="DisabilityTypeCert" className="AddStudent__input">
                <option value={1}>Blind (MDB)</option>
                <option value={2}>Blind (FDB)</option>
                <option value={3}>Visually Impaired</option>
                <option value={4}>Physically Disabled</option>
                <option value={5}>Learning Disability (organic)</option>
              </select>

              <label htmlFor="DistrictID">School District</label>
              <select name="DistrictID" className="AddStudent__input">
                <option value={1}>Atlanta Public Schools</option>
                <option value={2}>Brantley School District</option>
                <option value={3}>Effingham School District</option>
                <option value={4}>Fannin School District</option>
                <option value={5}>Elbert School District</option>
              </select>

              <label htmlFor="CountyID">County</label>
              <select name="CountyID" className="AddStudent__input">
                <option value={1}>Fulton</option>
                <option value={2}>Atkinson</option>
                <option value={3}>Baldwin</option>
                <option value={4}>Cherokee</option>
                <option value={5}>Dade</option>
              </select>

              <label htmlFor="EducationFacilityTypeID">Facility</label>
              <select name="EducationFacilityTypeID" className="AddStudent__input">
                <option value={1}>Public School</option>
                <option value={2}>Private (LEA Placed)</option>
                <option value={3}>Private (Proportionate Share VI)</option>
                <option value={4}>Private (Parentally Placed)</option>
                <option value={5}>Dept of Juvenile Justice</option>
                <option value={6}>Dept of Corrections</option>
                <option value={7}>State School</option>
                <option value={8}>Home School</option>
                <option value={9}>Other</option>
              </select>

              <label htmlFor="GaTestingID">GTID</label>
              <input type="number" name="GaTestingID" className="AddStudent__input" />

              <label htmlFor="Fname">First Name</label>
              <input type="text" name="Fname" className="AddStudent__input" />

              <label htmlFor="Mname">Middle Name</label>
              <input type="text" name="Mname" className="AddStudent__input" />

              <label htmlFor="Lname">Last Name</label>
              <input type="text" name="Lname" className="AddStudent__input" />

              <label htmlFor="DOB">Date of Birth</label>
              <input type="date" name="DOB" className="AddStudent__input" />

              <label htmlFor="GradeID">Grade</label>
              <select name="GradeID" className="AddStudent__input">
                <option value={1}>Early Intervention (&lt;3 y/o) = IP</option>
                <option value={2}>PreK (3-4 y/o) = PS</option>
                <option value={3}>1</option>
                <option value={4}>2</option>
                <option value={5}>3</option>
                <option value={6}>4</option>
                <option value={7}>5</option>
                <option value={8}>6</option>
                <option value={9}>7</option>
                <option value={10}>8</option>
                <option value={11}>9</option>
                <option value={12}>10</option>
                <option value={13}>11</option>
                <option value={14}>12</option>
                <option value={15}>Access Curriculum = FC</option>
                <option value={16}>Academic (non-graded = AN</option>
              </select>

              <label htmlFor="LanguageID">Language of Instruction</label>
              <input type="number" name="LanguageID" className="AddStudent__input" />

              <label htmlFor="DateLatestEyeExam">Date of eye report or other print disability certification (<a href="http://www.gadoe.org/Curriculum-Instruction-and-Assessment/Special-Education-Services/GIMC/Documents/Educators/Certification%20to%20receive%20AIM%20eligibility.pdf">http://www.gadoe.org/Curriculum-Instruction-and-Assessment/Special-Education-Services/GIMC/Documents/Educators/Certification%20to%20receive%20AIM%20eligibility.pdf</a>)</label>
              <input type="date" name="DateLatestEyeExam" className="AddStudent__input" />

              <label htmlFor="CertExamTypeID">Certification Authority</label>
              <select name="CertExamTypeID" className="AddStudent__input">
                <option value={1}>special education teacher</option>
                <option value={2}>learning disability, dyslexia, or resource specialist</option>
                <option value={3}>school psychologist</option>
                <option value={4}>clinical psychologist with a background in learning disabilities</option>
                <option value={5}>family doctor</option>
                <option value={6}>psychiatrist</option>
                <option value={7}>neurologist</option>
                <option value={8}>teacher of the visually impaired</option>
                <option value={9}>family doctor</option>
                <option value={10}>ophthalmologist</option>
                <option value={11}>optometrist</option>
                <option value={12}>National Library Service for the Blind and Physically Handicapped, or similar government body outside the U.S.</option>
                <option value={13}>resource specialist</option>
                <option value={14}>physical therapist</option>
                <option value={15}>family doctor or other medical professional</option>
              </select>

              <label htmlFor="WrittenPlanTypeID">Type of Written Plan</label>
              <select name="WrittenPlanTypeID" className="AddStudent__input">
                <option value={1}>EP</option>
                <option value={2}>504</option>
                <option value={3}>IFSP</option>
                <option value={4}>Home School Curriculum</option>
                <option value={5}>Private School Curriculum</option>
                <option value={6}>District/State</option>
                <option value={7}>Charter School</option>
              </select>

              <label htmlFor="DateWrittenPlan">Date of Written Plan (IEP, 504, or IFSP only)</label>
              <input type="date" name="DateWrittenPlan" className="AddStudent__input" />

              <label htmlFor="PrimaryReadingMediumTypeID">Primary Reading Media</label>
              <select name="PrimaryReadingMediumTypeID" className="AddStudent__input">
                <option value={1}>Braille = B</option>
                <option value={2}>Visual (Digital/Large Print) = V</option>
                <option value={3}>Auditory (TTS or Recorded) = A</option>
                <option value={4}>PreReader = PRE</option>
                <option value={5}>Non-Reader SNR</option>
              </select>

              <label htmlFor="Secondary1ReadingMediumTypeID">Secondary Reading Media</label>
              <select name="Secondary1ReadingMediumTypeID" className="AddStudent__input">
                <option value={1}>Braille = B</option>
                <option value={2}>Visual (Digital/Large Print) = V</option>
                <option value={3}>Auditory (TTS or Recorded) = A</option>
                <option value={4}>PreReader = PRE</option>
                <option value={5}>Non-Reader SNR</option>
                <option value={6}>N/A = N/A</option>
              </select>

              <label htmlFor="Secondary2ReadingMediumTypeID">Other Reading Media</label>
              <select name="Secondary2ReadingMediumTypeID" className="AddStudent__input">
                <option value={1}>Braille = B</option>
                <option value={2}>Visual (Digital/Large Print) = V</option>
                <option value={3}>Auditory (TTS or Recorded) = A</option>
                <option value={4}>PreReader = PRE</option>
                <option value={5}>Non-Reader SNR</option>
                <option value={6}>N/A = N/A</option>
              </select>

              <label htmlFor="NeedIMaterialsCert">The need for accessible educational materials is documented in the students written plan (IEP, 504, or IFSP only)</label><br />
              <input type="radio" id="NeedIMaterialsCert_yes" name="NeedIMaterialsCert" value={true} />
              <label id="NeedIMaterialsCert_yes">Yes</label><br />
              <input type="radio" id="NeedIMaterialsCert_no" name="NeedIMaterialsCert" value={false} />
              <label id="NeedIMaterialsCert_no">No</label><br /><br />

              <label htmlFor="APHID">APH registration: This student meets the definition of legal blindness according to an eye report. Eye Reports must be dated one year or less for students entering Special Education Services with an Initial Eligibility. or This student functions at the definition of blindness according to an eye report or neurological exam. Reports must be dated one year or less for students entering Special Education Services with an Initial Eligibility.</label><br />
              <input type="radio" id="APHID_true" name="APHID" value="1" />
              <label id="APHID_true">True</label><br />
              <input type="radio" id="APHID_true" name="APHID" value="0" />
              <label id="APHID_false">False</label><br /><br />

              <label htmlFor="ParentConsent">My district has acquired notarized consent to release this student’s information in order to acquire accessible instructional materials through the Georgia Instructional Materials Center.</label><br />
              <input type="radio" id="ParentConsent_agree" name="ParentConsent" value={true} />
              <label id="ParentConsent_agree">Agree</label><br />
              <input type="radio" id="ParentConsent_disagree" name="ParentConsent" value={false} />
              <label id="ParentConsent_disagree">Disagree</label><br /><br />

              <button type="submit" className="AddStudent__submit">Add Student</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
};

module.exports = Students;
