import React, { useState } from 'react';
import { Link } from 'gatsby';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Layout from '../components/layout';
import SEO from '../components/seo';

const CONTACT_MUTATION = gql`
  mutation CreateSubmissionMutation($clientMutationId: String!, $firstName: String!, $lastName: String!, $email: String!, $message: String!) {
    createSubmission(input: {clientMutationId: $clientMutationId, firstName: $firstName, lastName: $lastName, email: $email, message: $message}) {
      success
      data
    }
  }
`;

const IndexPage = () => {

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Contact Form Submission to WordPress with GraphQL</h1>
      <Mutation mutation={CONTACT_MUTATION}>
        {(createSubmission, { loading, error, data }) => (
          <React.Fragment>
            <form
              onSubmit={async e => {
                e.preventDefault();
                createSubmission({
                  variables: {
                    clientMutationId: 'example',
                    firstName: firstNameValue,
                    lastName: lastNameValue,
                    email: emailValue,
                    message: messageValue
                  }
                })
              }}
            >
              <label htmlFor="firstNameInput">First name:</label>
              <input
                id="firstNameInput"
                value={firstNameValue}
                onChange={e => setFirstNameValue(e.target.value)}
              />
              <br />
              <label htmlFor="lastNameInput">Last name:</label>
              <input
                id="lastNameInput"
                value={lastNameValue}
                onChange={e => setLastNameValue(e.target.value)}
              />
              <br />
              <label htmlFor="emailInput">Email:</label>
              <input
                id="emailInput"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
              />
              <br />
              <label htmlFor="messageInput">Message:</label>
              <textarea
                id="messageInput"
                value={messageValue}
                onChange={e => setMessageValue(e.target.value)}
              >
              </textarea>
              <br />
              <button type="submit">Send it!</button>
            </form>
            <div style={{ padding: "20px" }}>
              {loading && <p>Loading...</p>}
              {error && (
                <p>An unknown error has occured, please try again later... </p>
              )}
              {data && <p>Thanks for your submission!</p>}
            </div>
          </React.Fragment>
        )}
      </Mutation>
    </Layout>
  );

}

export default IndexPage;
